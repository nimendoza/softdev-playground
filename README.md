# softdev-playground

PSHS-MC RAM '22-'23 Software Division Playground

## Setup

If you're on Windows, it's assumed that you're running [WSL2](aka.ms/wsl2).

### Setup docker

Download the [installer for Docker](https://docs.docker.com/desktop/release-notes/#docker-desktop-430) and install it. If you're using WSL 2, enable the WSL integration through Docker Desktop.

### Setup the repository

Make sure that you have [an ssh-key set up](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

```shell
sudo apt update
sudo apt upgrade
sudo apt install npm
git clone git@github.com:nimendoza/softdev-playground.git
code softdev-playground
```

### Running the repository

In the VSCode integrated terminal, run:

```shell
npm run system
```

If everything runs fine (which I hope it does), you should be able to play around at [http://localhost:3000/](http://localhost:3000/).

## Contributors

[Neomi Mendoza](https://github.com/nimendoza)
