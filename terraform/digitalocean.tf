provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = "Terraform"
}

resource "digitalocean_project" "saturn" {
  name        = "saturn"
  description = "A project to represent saturn web application resources."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [digitalocean_droplet.saturn.urn]
}

resource "digitalocean_droplet" "saturn" {
  image = "docker-20-04"
  name = "saturn-web-app"
  region = "ams3"
  size = "s-1vcpu-1gb"

  tags = ["saturn", "web"]

  ssh_keys = [
    data.digitalocean_ssh_key.terraform.id
  ]

  connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = var.pvt_key
    timeout = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "mkdir /home/app",
    ]
  }

  provisioner "file" {
    source      = "../"
    destination = "/home/app"
  }

  provisioner "file" {
    content     = templatefile("${path.module}/configs/docker-compose.yaml", {
      app_version      = local.app_version,
      frontend_version = local.frontend_version,
      domain           = local.domain
    })
    destination = "/home/app/docker-compose.yaml"
  }

  provisioner "remote-exec" {
    inline = [
      "cd /home/app",
      "docker-compose up -d",
    ]
  }

}
