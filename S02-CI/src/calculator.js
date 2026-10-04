/**
 * S-16: Bên nhận xác nhận hoặc từ chối bàn giao kèm lý do.
 *
 * Quy ước:
 * - confirmHandover: xác nhận bàn giao.
 * - rejectHandover: từ chối và bắt buộc phải có lý do.
 * - handleConfirmationRequest: kiểm tra người gọi có quyền xác nhận hay không.
 *   Nếu không được phép -> trả về 403.
 */

function normalizeReason(reason) {
  return typeof reason === "string" ? reason.trim() : "";
}

function confirmHandover(state, receiverId) {
  if (!receiverId) {
    throw new Error("receiverId là bắt buộc");
  }

  const event = {
    type: "HANDOVER_CONFIRMED",
    receiverId,
    timestamp: new Date().toISOString()
  };

  return {
    ...state,
    status: "CONFIRMED",
    events: [...(state.events || []), event]
  };
}

function rejectHandover(state, receiverId, reason) {
  const normalizedReason = normalizeReason(reason);

  // Từ chối nhưng không có lý do -> bị chặn.
  if (!normalizedReason) {
    const error = new Error("Từ chối bàn giao phải có lý do");
    error.statusCode = 400;
    throw error;
  }

  const event = {
    type: "HANDOVER_REJECTED",
    receiverId,
    reason: normalizedReason,
    timestamp: new Date().toISOString()
  };

  return {
    ...state,
    status: "REJECTED",
    rejectionReason: normalizedReason,
    events: [...(state.events || []), event]
  };
}

function handleConfirmationRequest({
  state = { status: "PENDING", events: [] },
  receiverId,
  action,
  reason,
  requesterId
}) {
  // Chỉ người nhận được chỉ định mới được xác nhận/từ chối.
  if (!receiverId || requesterId !== receiverId) {
    return {
      statusCode: 403,
      body: {
        message: "Bạn không có quyền xác nhận bàn giao này"
      }
    };
  }

  if (action === "confirm") {
    return {
      statusCode: 200,
      body: confirmHandover(state, receiverId)
    };
  }

  if (action === "reject") {
    try {
      return {
        statusCode: 200,
        body: rejectHandover(state, receiverId, reason)
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 400,
        body: {
          message: error.message
        }
      };
    }
  }

  return {
    statusCode: 400,
    body: {
      message: "action phải là confirm hoặc reject"
    }
  };
}

module.exports = {
  confirmHandover,
  rejectHandover,
  handleConfirmationRequest
};
