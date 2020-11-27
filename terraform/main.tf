terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "1.22.2"
    }
  }
}

locals {
  app_version      = "0.5"
  frontend_version = "0.5"
  domain           = "xamber.tech"
}