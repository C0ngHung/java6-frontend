/**
 * Custom error messages mapping
 * Maps backend error codes to user-friendly frontend messages
 */

export const ERROR_MESSAGES: Record<number, string> = {
  // Auth errors (1000-1999)
  1001: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.',
  1002: 'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.',
  1003: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  1004: 'Không thể tạo token. Vui lòng thử lại sau.',
  1005: 'Token không hợp lệ. Vui lòng đăng nhập lại.',
  1006: 'Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.',
  1007: 'Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.',
  1008: 'Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.',
  1009: 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.',
  1010: 'Mã OTP đã được sử dụng. Vui lòng yêu cầu mã mới.',

  // User errors (2000-2999)
  2001: 'Tên người dùng đã tồn tại. Vui lòng chọn tên khác.',
  2002: 'Không tìm thấy thông tin người dùng.',
  2003: 'Tên đăng nhập đã được sử dụng. Vui lòng chọn tên khác.',
  2004: 'Email đã được đăng ký. Vui lòng sử dụng email khác.',
  2101: 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.',
  2102: 'Không tìm thấy vai trò người dùng.',
  2103: 'Người dùng đã có vai trò này.',

  // Product errors (3000-3999)
  3001: 'Không tìm thấy sản phẩm.',
  3002: 'Sản phẩm đã tồn tại.',
  3003: 'Mã SKU đã tồn tại. Vui lòng sử dụng mã khác.',
  3004: 'Sản phẩm đã hết hàng.',
  3005: 'Giá sản phẩm không hợp lệ. Vui lòng kiểm tra lại.',

  // Cart errors (4000-4999) - Note: Some codes overlap with Common errors, Cart takes priority
  4001: 'Không tìm thấy giỏ hàng.',
  4002: 'Không tìm thấy sản phẩm trong giỏ hàng.',
  4003: 'Sản phẩm đã có trong giỏ hàng.',
  4004: 'Dữ liệu giỏ hàng không hợp lệ. Vui lòng thử lại.',
  4005: 'Giỏ hàng trống.',

  // Common errors (4000-4099) - Only non-overlapping codes
  4000: 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.',
  4090: 'Dữ liệu đã tồn tại hoặc xung đột. Vui lòng kiểm tra lại.',

  // Order errors (5000-5999)
  5001: 'Không tìm thấy đơn hàng.',
  5002: 'Không tìm thấy sản phẩm trong đơn hàng.',
  5003: 'Dữ liệu đơn hàng không hợp lệ. Vui lòng kiểm tra lại.',
  5004: 'Giỏ hàng trống, không thể tạo đơn hàng.',
  5005: 'Sản phẩm không đủ số lượng trong kho.',
  5006: 'Tạo đơn hàng thất bại. Vui lòng thử lại sau.',
};

/**
 * HTTP status code to custom message mapping
 */
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.',
  401: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  403: 'Bạn không có quyền thực hiện thao tác này.',
  404: 'Không tìm thấy tài nguyên yêu cầu.',
  409: 'Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.',
  422: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
  500: 'Lỗi hệ thống. Vui lòng thử lại sau.',
  502: 'Lỗi kết nối đến server. Vui lòng thử lại sau.',
  503: 'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.',
};

/**
 * Default error messages for different contexts
 */
export const DEFAULT_ERROR_MESSAGES = {
  PROFILE_UPDATE: 'Cập nhật thông tin thất bại. Vui lòng thử lại.',
  PROFILE_LOAD: 'Không thể tải thông tin người dùng. Vui lòng thử lại.',
  LOGIN: 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.',
  REGISTER: 'Đăng ký thất bại. Vui lòng thử lại.',
  LOGOUT: 'Đăng xuất thất bại. Vui lòng thử lại.',
  CART_GET: 'Không thể tải giỏ hàng. Vui lòng thử lại.',
  CART_ADD: 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.',
  CART_UPDATE: 'Không thể cập nhật giỏ hàng. Vui lòng thử lại.',
  CART_REMOVE: 'Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.',
  CART_CLEAR: 'Không thể xóa giỏ hàng. Vui lòng thử lại.',
  ORDER_CREATE: 'Đặt hàng thất bại. Vui lòng thử lại.',
  ORDER_LOAD: 'Không thể tải thông tin đơn hàng. Vui lòng thử lại.',
  PRODUCT_SAVE: 'Không thể lưu sản phẩm. Vui lòng thử lại.',
  PRODUCT_LOAD: 'Không thể tải thông tin sản phẩm. Vui lòng thử lại.',
  PRODUCT_DELETE: 'Không thể xóa sản phẩm. Vui lòng thử lại.',
  PRODUCT_UPLOAD: 'Không thể tải lên hình ảnh. Vui lòng thử lại.',
  GENERIC: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
};

