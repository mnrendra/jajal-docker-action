const { execa } = require('execa')

const main = async () => {
  const abc = await execa('./susi.sh', ['susi', "abc def ghi", '/bye'])
  // const abc = await execa`./susi.sh asu "abc def ghi" /bye`
  console.log(abc.stderr)
  console.log(abc.stdout)
}

main()
