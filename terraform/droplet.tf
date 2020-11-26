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

//  provisioner "remote-exec" {
//    inline = [
//      "mkdir /home/app",
//    ]
//  }
//
//  provisioner "file" {
//    source      = "../"
//    destination = "/home/app"
//  }
//
//  provisioner "remote-exec" {
//    inline = [
//      "cd /home/app",
//      "docker-compose up -d",
//    ]
//  }

}

resource "docker_image" "backend" {
  name = "xamber/saturn-app"
}

resource "docker_image" "frontend" {
  name = "xamber/saturn-frontend"
}

resource "docker_image" "postgres" {
  name = "xamber/postgress"
}

resource "docker_container" "backend" {
  image = "${docker_image.backend.latest}"
  name  = "saturn"
}

resource "docker_container" "frontend" {
  image = "${docker_image.frontend.latest}"
  name  = "frontend"
}

resource "docker_container" "postgres" {
  image = "${docker_image.postgres.latest}"
  name  = "postgres"
}
