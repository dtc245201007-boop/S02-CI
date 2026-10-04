const assert = require("node:assert/strict");

const {
  confirmHandover,
  rejectHandover,
  handleConfirmationRequest
} = require("../src/calculator");

const initialState = {
  status: "PENDING",
  events: []
};

// AC1: Người nhận xác nhận -> chuyển trạng thái và ghi sự kiện.
{
  const result = confirmHandover(initialState, "receiver-01");

  assert.equal(result.status, "CONFIRMED");
  assert.equal(result.events.at(-1).type, "HANDOVER_CONFIRMED");
}

// AC2: Từ chối kèm lý do -> ghi lý do vào sự kiện.
{
  const result = rejectHandover(
    initialState,
    "receiver-01",
    "Thông tin bàn giao chưa đầy đủ"
  );

  assert.equal(result.status, "REJECTED");
  assert.equal(
    result.rejectionReason,
    "Thông tin bàn giao chưa đầy đủ"
  );
  assert.equal(
    result.events.at(-1).reason,
    "Thông tin bàn giao chưa đầy đủ"
  );
}

// AC3: Từ chối nhưng để trống lý do -> bị chặn.
{
  assert.throws(
    () => rejectHandover(initialState, "receiver-01", "   "),
    /phải có lý do/
  );
}

// AC4: Người khác gọi API xác nhận -> HTTP 403.
{
  const result = handleConfirmationRequest({
    state: initialState,
    receiverId: "receiver-01",
    requesterId: "other-user",
    action: "confirm"
  });

  assert.equal(result.statusCode, 403);
}

// Người nhận đúng có thể xác nhận qua API.
{
  const result = handleConfirmationRequest({
    state: initialState,
    receiverId: "receiver-01",
    requesterId: "receiver-01",
    action: "confirm"
  });

  assert.equal(result.statusCode, 200);
  assert.equal(result.body.status, "CONFIRMED");
}

console.log("All S-16 tests passed.");
