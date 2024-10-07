# GitLab Reviewer

**❗ This project is abandoned and no longer actively maintained.**

[![Netlify Status](https://api.netlify.com/api/v1/badges/80c95e9b-a3a7-4b2a-a115-5508fc98a619/deploy-status)](https://app.netlify.com/sites/gitlab-reviewer/deploys)

UI to see all GitLab merge requests of your team in one place.

![gitlab-reviewer](screenshot.png)

## Requirements

* [GitLab](https://about.gitlab.com/)



### Install dependencies
### 安装gitlab， https://blog.csdn.net/qq_31237581/article/details/102639749
### 修改默认密码https://blog.csdn.net/qq_35002542/article/details/129590962 
### gitlab容器化启动官方文档https://gitlab.com/gitlab-org/omnibus-gitlab/-/blob/11-11-stable/doc/docker/README.md

```shell
podman run --detach \
  --hostname 192.168.200.129 \
  --publish 443:443 --publish 80:80 --publish 8022:22 \
  --name gitlab \
  --privileged=true \
  --restart always \
  --volume /root/gitlab/config:/etc/gitlab:Z \
  --volume /root/gitlab/logs:/var/log/gitlab:Z \
  --volume /root/gitlab/data:/var/opt/gitlab:Z \
  quay.io/redhattraining/gitlab-ce:8.4.3-ce.0

firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=443/tcp --permanent
firewall-cmd --zone=public --add-port=8022/tcp --permanent
firewall-cmd --reload
```

```shell
$ vim /etc/yum.repos.d/gitlab-ce.repo
[gitlab-ce]
name=gitlab-ce
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7
gpgcheck=0
Repo_gpgcheck=0
Enabled=1
Gpgkey=https://packages.gitlab.com/gpg.key

$ sudo yum install gitlab-ce -y
```
###创建一个MergeRequest。 https://www.cnblogs.com/liwutao/p/11647092.html
####

## Installation

### Clone the project

```shell
$ git clone https://github.com/wanghongtao007/gitlab-reviewer.git
$ cd gitlab-reviewer
```

```shell
$ yum install yarnpkg
$ yarn
```

## Run the server

After configuration, you have to build the code and launch the server.

```shell
$ export NODE_OPTIONS=--openssl-legacy-provider
## 或者是修改package.json里面的内容，"start": "set NODE_OPTIONS=--openssl-legacy-provider & yarn run watch:css & react-scripts start"

$ yarn start
```

Then open `http://localhost:3000` in your browser.

### Inspiration

Thanks :
* [TheRedDot/MergeRequestsCI](https://github.com/TheRedDot/MergeRequestsCI)
* [M6Web](https://tech.m6web.fr/) ([Github Team Reviewer](https://github.com/M6Web/GithubTeamReviewer))

## License

[gitlab-reviewer](https://github.com/Akollade/gitlab-reviewer) is licensed under the [MIT license](LICENSE).
