const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const PROJECT_DIR = path.resolve(__dirname, "..");
const IMG_TYPES = [".jpg", ".png", ".jpeg"];
const BIN_CWEBP = path.resolve(PROJECT_DIR, "bin", "cwebp");

const { argv } = process;
if (argv.length !== 3) {
  console.error("Must Type Target Image Dir");
  process.exit(1);
}
const TARGET_IMAGE_DIR = argv[2];

function validate_image_path() {
  const img_dir = path.join(PROJECT_DIR, TARGET_IMAGE_DIR);

  if (!fs.existsSync(img_dir)) {
    console.error("Invalidate Image Dir");
    process.exit(1);
  }

  if (!img_dir.includes(PROJECT_DIR)) {
    console.error("Invalidate Image Dir");
    process.exit(1);
  }

  const stat = fs.statSync(img_dir);
  if (!stat.isDirectory()) {
    console.error("Invalidate Image Dir");
    process.exit(1);
  }
}

function to_webp() {
  const img_dir = path.join(PROJECT_DIR, TARGET_IMAGE_DIR);
  const files = fs.readdirSync(img_dir);
  for (const file of files) {
    const extname = path.extname(file);
    if (!IMG_TYPES.includes(extname)) continue;

    try {
      // 转化为 webp 格式
      execFileSync(
        BIN_CWEBP,
        `-q 80 ${file} -o ${file.replace(extname, ".webp")}`.split(" "),
        {
          cwd: img_dir,
        }
      );

      // 移除旧图片
      fs.unlinkSync(path.resolve(img_dir, file));
    } catch (e) {
      console.error(e);
    }
  }
}

function main() {
  validate_image_path();
  to_webp();
}

main();
