
let _env_to_dir = {
    ashare: 'ashare',
}

let _env_config = String(process.env.env_config || process.env.npm_config_site || 'ashare').trim()
let _dirName = _env_to_dir[_env_config]
console.log(_env_config)
module.exports = {
    baseUrl: 'demo',
    env_config: _env_config,
    dirName: _dirName,
    env_to_dir: _env_to_dir
}