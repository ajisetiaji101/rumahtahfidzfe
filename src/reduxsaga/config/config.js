const config = {
  domain: "http://143.198.200.178:3000/newbackend/v1/api",
  // domain: "https://newbackend.pondoktahfidzquran.my.id/newbackend/v1/api",
  // urlImageCure: "http://localhost:3001/codeid/api/curriculum_reviews/images",
  // urlImageInst: "http://localhost:3001/codeid/api/instructor/images",
  // domainAuth: "http://localhost:3001/codeid/api/auth",
  urlImage: "http://143.198.200.178:3000/newbackend/v1/api/gambar",
  // urlImage:
  // "https://newbackend.pondoktahfidzquran.my.id/newbackend/v1/api/gambar",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  // jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
};

export default config;
