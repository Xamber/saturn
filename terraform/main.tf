terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "1.22.2"
    }
    docker = {
      source = "terraform-providers/docker"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

provider "docker" {
  host = "ssh://root@${digitalocean_droplet.saturn.ipv4_address}:22"
}

data "digitalocean_ssh_key" "terraform" {
  name = "Terraform"
}