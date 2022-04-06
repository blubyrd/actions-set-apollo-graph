import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const prodGraph = core.getInput('prod-apollo-graph', {required: true})
    const prodKey = core.getInput('prod-apollo-key', {required: true})
    const stageGraph = core.getInput('stage-apollo-graph', {required: true})
    const stageKey = core.getInput('stage-apollo-key', {required: true})
    const devGraph = core.getInput('dev-apollo-graph', {required: true})
    const devKey = core.getInput('dev-apollo-key', {required: true})
    const environmentName = core.getInput('environment-name', {required: true})
    let apolloKey
    let apolloGraph
    switch (environmentName) {
      case 'prod':
        apolloGraph = prodGraph
        apolloKey = prodKey
        core.info('Using prod graph and key')
        break
      case 'stage':
        apolloGraph = stageGraph
        apolloKey = stageKey
        core.info('Using staging graph and key')
        break
      case 'dev':
        apolloGraph = devGraph
        apolloKey = devKey
        core.info('Using dev graph and key')
        break
      default:
        apolloGraph = ''
        apolloKey = ''
        core.info('Invalid environment')
        break
    }
    core.setOutput('apollo-key', apolloKey)
    core.setOutput('apollo-graph-ref', apolloGraph)
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

run()
