import core from '@actions/core';
import shell from 'shelljs';

function run() {
  try {
    // const version = core.getInput('version');

    shell.exec('sudo apt-get remove -y docker docker-engine docker.io containerd runc');
    shell.exec('sudo apt-get update');
    shell.exec('sudo apt-get install -y ca-certificates curl gnupg lsb-release');
    shell.exec('curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg');
    shell.exec('echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null');
    shell.exec('sudo apt-get update');
    shell.exec('sudo apt-get install -y docker-ce docker-ce-cli containerd.io');

    core.setOutput('version', shell.exec('docker --version').stdout.matchAll('/Docker version ([0-9.]*)/g')[0]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()