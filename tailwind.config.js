module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      spacing: {
        '4.5' : '18px'
      },
      fontSize: {
        'xxs' : '0.688rem' // 11px
      },
      dropShadow: {
        'xs': '0 1px 1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
