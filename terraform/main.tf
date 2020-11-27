terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "1.22.2"
    }
  }
}

locals {
  app_version      = "0.5.1"
  frontend_version = "0.5.1"
  domain           = "xamber.tech"
}