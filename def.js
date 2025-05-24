const { execa } = require('execa')

const main = async () => {
  const abc = await execa('./susi.sh', ['"PRESET_PASSPHRASE 6194F91B323E8AA8BB42147CC46370DEE085B20B -1 437A396874726464637A3F21"', '/bye'])
  // const abc = await execa`./susi.sh asu "abc def ghi" /bye`
  console.log(abc.stderr)
  console.log(abc.stdout)
}

main()
