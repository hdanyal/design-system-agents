const input = await new Promise((resolve) => {
  let data = ""
  process.stdin.setEncoding("utf8")
  process.stdin.on("data", (chunk) => (data += chunk))
  process.stdin.on("end", () => resolve(data))
  setTimeout(() => resolve(data), 50)
})

const command = `${input} ${process.argv.slice(2).join(" ")}`
const blocked = [
  /git push[^\n]*\bmain\b/,
  /npm publish/,
  /pnpm publish/,
  /cat \.env\b/,
  /printenv .*TOKEN/,
]

if (blocked.some((pattern) => pattern.test(command))) {
  console.error("Blocked by Carina fail-closed hook. See SECURITY.md.")
  process.exit(2)
}

process.exit(0)
