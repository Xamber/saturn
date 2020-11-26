resource "digitalocean_project" "saturn" {
  name        = "saturn"
  description = "A project to represent saturn web application resources."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [digitalocean_droplet.saturn.urn]
}

resource "digitalocean_droplet" "saturn" {
  image = "docker-20-04"
  name = "www-1"
  region = "ams3"
  size = "s-1vcpu-1gb"
  private_networking = true

  ssh_keys = [
    data.digitalocean_ssh_key.terraform.id
  ]

  connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = file(var.pvt_key)
    timeout = "2m"
  }

  provisioner "file" {
    source      = "../../../"
    destination = "/home/app"
  }

  provisioner "remote-exec" {
    inline = [
      "cd /home/app",
      "docker-compose up",
    ]
  }

}