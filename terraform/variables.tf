variable "do_token" {
  type        = string
  description = "Digital Ocean auth token"
}

variable "pvt_key" {
  type        = string
  description = "SSH key"
  default     = "$HOME/.ssh/id_rsa"
}