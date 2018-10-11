#!/bin/sh

########## foreword ##########
# 使用 brew 安装需要用到的软件版本

########## alias setup ##########
write_alias=0

if [ ! -f ~/.bash_profile ]
  then
    $(touch ~/.bash_profile)
    write_alias=1
  elif [ -z "$(cat ~/.bash_profile | grep 'alias brew-switch=')" ]
    then write_alias=1
fi

# write alias in bash file
if [ $write_alias == 1 ]
  then
    full_path=$(cd `dirname $0`; pwd)/$(basename $0)
    echo "alias brew-switch=\"$full_path\"" >> ~/.bash_profile
    echo "alias setup succeeded, please reboot terminal."
fi

# 如果 ~/.zshrc 内有如下语句（共享 bash_profile 文件的别名设置），则不添加别名
# test -f ~/.bash_profile  && source ~/.bash_profile
if [ -n ~/.zshrc ] && [ -z "$(cat ~/.zshrc | grep -e 'alias brew-switch=' -e '~/.bash_profile')" ]
  then
    full_path=$(cd `dirname $0`; pwd)/$(basename $0)
    echo "alias brew-switch=\"$full_path\"" >> ~/.zshrc
    echo "alias setup succeeded, please reboot terminal."
fi

########## command operations ##########
if [ -z "$1" ]
  then 
    printf "\e[31mError: \e[0m \n"
    printf "  Usage: brew-switch <formula> <version> \n"
    printf "  Example: brew-switch mongodb 4.0 \n"
    exit
fi

# get process name
case $1 in
  mongodb)
    process_name="mongod"
  ;;
  *)
    process_name="$1"
  ;;
esac

PID=$(pgrep $process_name)

# kill process by PID
if [ -n "$PID" ]
  then
    printf "kill $process_name, PID: $PID "
    printf "$(sudo kill $PID)"
fi

# unlink program
brew unlink $1

# link new version of the program
if [ -n "$2" ]
  then 
    brew unlink $1@$2
    brew link --force --overwrite $1@$2
  else 
    brew link --force --overwrite $1
fi

########## reboot ##########
if [ $1 == 'mongodb' ]
  then
    if [ -z "$2" ] || [[ $2 > 4 || $2 == 4 ]]
      # MongoDB >= 4 configuration
      then echo $(sudo mongod --fork -f /usr/local/etc/mongod.conf)
      # MongoDB < 4 configuration
      else echo $(sudo mongod --fork -f /data/mongodb3/mongod.conf)
    fi
fi