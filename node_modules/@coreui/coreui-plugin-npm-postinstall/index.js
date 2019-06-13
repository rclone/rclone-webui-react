#!/usr/bin/env node

const pkg   = require(require('path').resolve('./package.json'))
const chalk = require('chalk')
const log   = console.log

const VERSIONS = {
  '@coreui/coreui': 'https://coreui.io/pro/',
  '@coreui/angular': 'https://coreui.io/pro/angular/',
  '@coreui/react': 'https://coreui.io/pro/react/',
  '@coreui/vue': 'https://coreui.io/pro/vue/'
}

const url = pkg.homepage.replace('.io/', '.io/pro/')

log(chalk.green.bold('Thank you for using free version of CoreUI!'))
log(chalk.green('CoreUI is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support development by buying CoreUI Pro Version: ') + chalk.blue.bold.underline(`${VERSIONS[pkg.name]}`))
log()
