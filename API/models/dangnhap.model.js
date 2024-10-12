module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        email: String,
        password: String,
        // Các trường khác liên quan đến thông tin đăng nhập có thể được thêm vào đây
      },
      { timestamps: true }
    );

    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const User = mongoose.model("dangnhap", schema); // Đổi tên collection thành "User" cho phù hợp với đối tượng đăng nhập

    return User;
  };
