module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // mergeProps：关闭vue编译器merge相同名称属性的默认行为
  plugins: [["@vue/babel-plugin-jsx", {mergeProps: false}]]
};
