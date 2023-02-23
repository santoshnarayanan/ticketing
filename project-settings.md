# create JWT_KEY inside K8
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

#Check Docker Dameon is running or not and start Dameon
sudo systemctl status docker
sudo systemctl start docker

# Start Minikube
minikube start --driver=docker

# Contents of /etc/hosts
# Loopback entries; do not change.
# For historical reasons, localhost precedes localhost.localdomain:
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
# See hosts(5) for proper format and other examples:
# 192.168.1.10 foo.mydomain.org foo
# 192.168.1.13 bar.mydomain.org bar
# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
127.0.0.1	kubernetes.docker.internal
# End of section

#Added below statements
127.0.0.1 posts.com
192.168.49.2 ticketing.local --minikube ip will give IP address

#Further conversation

For Linux, I would recommend using ticketing.local. You will then update the ingress-srv.yml host to the following:

    - host: ticketing.local

And you will access in your browser:

https://ticketing.local/api/users/currentuser


Also, please make sure you are using the Minikube Ingress add-on and not applying the Docker Desktop Ingress
minikube addons enable ingress

The above step must be performed every time you delete your cluster and recreate.

Check to make sure the Ingress is running:

kubectl get services -n ingress-nginx

This should return something similar:

ingress-nginx-controller             NodePort    10.97.43.189    <none>        80:31070/TCP,443:30086/TCP   15m

ingress-nginx-controller-admission   ClusterIP   10.104.166.22   <none>        443/TCP                      15m


Lastly, make sure you have run skaffold dev and verified the auth service is running with no errors. If you've made changes to the ingress you may want to run skaffold delete and then skaffold dev again.

If the 503 error persists, can you share your project code in a GitHub repo so I can try to replicate?


