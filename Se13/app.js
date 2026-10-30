const bookings = [
  {bookingCode: "CIN-001", customerName: "Nguyễn Văn An", movieTitle: "Ánh Trăng Cuối Phố", ticketCount: 2, pricePerTicket: 90000, totalAmount: 194400},
  {bookingCode: "CIN-002", customerName: "Trần Thị Bình", movieTitle: "Biệt Đội Sao Băng", ticketCount: 4, pricePerTicket: 90000, totalAmount: 349920},
  {bookingCode: "CIN-003", customerName: "Lê Minh Châu", movieTitle: "Mùa Hè Rực Lửa", ticketCount: 6, pricePerTicket: 110000, totalAmount: 641520}
];

function findBookingIndex(code) {
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === code) {
      return i;
    }
  }
  return -1;
}

function validateBookingCode(code) {
  if (code === "") {
    return "Chưa nhập mã đặt vé";
  }
  if (code.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("CIN-")) {
    return 'Sai tiền tố "CIN-"';
  }
  if (code.includes(" ")) {
    return "Mã đặt vé chứa khoảng trắng";
  }
  if (findBookingIndex(code) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }
  return "";
}

function inputPositiveInteger(message) {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const number = Number(input.trim());
    if (input.trim() !== "" && Number.isInteger(number) && number > 0) {
      return number;
    }
    console.log("Vui lòng nhập số nguyên lớn hơn 0.");
  }
}

function calculateTotal(ticketCount, pricePerTicket) {
  const baseCost = ticketCount * pricePerTicket;
  let discount = 0;
  if (ticketCount >= 4) {
    discount = Math.round(baseCost * 0.1);
  }
  const serviceFee = Math.round((baseCost - discount) * 0.08);
  const totalAmount = baseCost - discount + serviceFee;
  return {
    baseCost: baseCost,
    discount: discount,
    serviceFee: serviceFee,
    totalAmount: totalAmount
  };
}

function displayBookings(list) {
  if (list.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }
  let totalRevenue = 0;
  for (let i = 0; i < list.length; i++) {
    const booking = list[i];
    console.log((i + 1) + ". " + booking.bookingCode + " - " + booking.customerName + " - " + booking.movieTitle);
    console.log(
      "   SL: " + booking.ticketCount + " | Giá: " + booking.pricePerTicket + " | Tổng TT: " + booking.totalAmount);
    totalRevenue += booking.totalAmount;
  }
  console.log("Tổng: " + list.length + " đơn đặt vé");
  console.log("Doanh thu: " + totalRevenue);
}

function inputBookingCode(message) {
  const input = prompt(message);

  if (input === null) {
    return null;
  }

  return input.trim().toUpperCase();
}

function displayInvoice(booking, costs) {
  console.log("Mã đặt vé: " + booking.bookingCode);
  console.log("Khách hàng: " + booking.customerName);
  console.log("Tên phim: " + booking.movieTitle);
  console.log("Số vé: " + booking.ticketCount);
  console.log("Giá mỗi vé: " + booking.pricePerTicket);
  console.log("Chi phí cơ sở: " + costs.baseCost);
  console.log("Giảm giá: " + costs.discount);
  console.log("Phí dịch vụ: " + costs.serviceFee);
  console.log("Tổng thanh toán: " + costs.totalAmount);
}

function showBookings() {
  displayBookings(bookings);
}

function addBooking() {
  const code = inputBookingCode("Nhập mã đặt vé:");
  if (code === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  const error = validateBookingCode(code);
  if (error !== "") {
    console.log("Lỗi: " + error);
    return;
  }
  let customerName = "";
  while (customerName === "") {
    const input = prompt("Nhập tên khách hàng:");
    if (input === null) {
      console.log("Đã hủy thao tác thêm");
      return;
    }
    customerName = input.trim().replace(/\s+/g, " ");
    if (customerName === "") {
      console.log("Tên khách hàng không được để trống");
    }
  }
  let movieTitle = "";
  while (movieTitle === "") {
    const input = prompt("Nhập tên phim:");
    if (input === null) {
      console.log("Đã hủy thao tác thêm");
      return;
    }
    movieTitle = input.trim().replace(/\s+/g, " ");
    if (movieTitle === "") {
      console.log("Tên phim không được để trống");
    }
  }
  const ticketCount = inputPositiveInteger("Nhập số vé:");
  if (ticketCount === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé:");
  if (pricePerTicket === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }
  const costs = calculateTotal(ticketCount, pricePerTicket);
  const newBooking = {
    bookingCode: code,
    customerName: customerName,
    movieTitle: movieTitle,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: costs.totalAmount
  };

  bookings.push(newBooking);
  console.log("Thêm đơn đặt vé thành công");
  displayInvoice(newBooking, costs);
}


function updateBooking() {
  const code = inputBookingCode("Nhập mã đặt vé cần cập nhật:");
  if (code === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  const index = findBookingIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + code);
    return;
  }
  const ticketCount = inputPositiveInteger("Nhập số vé mới:");
  if (ticketCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới:");
  if (pricePerTicket === null) {
    console.log("Đã hủy cập nhật");
    return;
  }
  const booking = bookings[index];
  const oldTotal = booking.totalAmount;
  const costs = calculateTotal(ticketCount, pricePerTicket);
  booking.ticketCount = ticketCount;
  booking.pricePerTicket = pricePerTicket;
  booking.totalAmount = costs.totalAmount;
  console.log("Cập nhật thành công");
  console.log("Tổng thanh toán cũ: " + oldTotal);
  console.log("Tổng thanh toán mới: " + booking.totalAmount);
}

function deleteBooking() {
  const code = inputBookingCode("Nhập mã đặt vé cần xóa:");
  if (code === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }
  const index = findBookingIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy đơn đặt vé có mã " + code);
    return;
  }
  const confirmDelete = prompt("Nhập Y để xác nhận xóa:");
  if (
    confirmDelete === null ||
    confirmDelete.trim().toUpperCase() !== "Y"
  ) {
    console.log("Đã hủy thao tác xóa");
    return;
  }
  bookings.splice(index, 1);
  console.log("Xóa thành công");
  console.log("Số đơn còn lại: " + bookings.length);
}

function searchBooking() {
  const input = prompt("Nhập tên phim cần tìm:");
  if (input === null || input.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  const keyword = input.trim().toLowerCase();
  const results = [];
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].movieTitle.toLowerCase().includes(keyword)) {
      results.push(bookings[i]);
    }
  }
  if (results.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
  } else {
    displayBookings(results);
  }
}

function showMenu() {
  let running = true;
  while (running) {
    console.log("===== MOONLIGHT CINEMA =====");
    console.log("1. Hiển thị danh sách đơn đặt vé");
    console.log("2. Thêm đơn đặt vé mới");
    console.log("3. Cập nhật đơn đặt vé");
    console.log("4. Xóa đơn đặt vé");
    console.log("5. Tìm kiếm theo tên phim");
    console.log("0. Thoát chương trình");

    const input = prompt("Nhập lựa chọn từ 0 đến 5:");
    if (input === null) {
      console.log("Lựa chọn không hợp lệ");
      continue;
    }
    const choiceText = input.trim();
    const choice = Number(choiceText);
    if (
      choiceText === "" ||
      !Number.isInteger(choice) ||
      choice < 0 ||
      choice > 5
    ) {
      console.log("Lựa chọn không hợp lệ");
      continue;
    }

    switch (choice) {
      case 1:
        showBookings();
        break;
      case 2:
        addBooking();
        break;
      case 3:
        updateBooking();
        break;
      case 4:
        deleteBooking();
        break;
      case 5:
        searchBooking();
        break;
      case 0:
        console.log("Cảm ơn bạn đã sử dụng chương trình");
        running = false;
        break;
      default:
        console.log("Lựa chọn không hợp lệ");
        break;
    }
  }
}

showMenu();