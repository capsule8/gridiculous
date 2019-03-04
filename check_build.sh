# `yarn install` builds post install so we don't need to `yarn build` here
if [[ $(git status --short) ]]
then
  echo -e '\nERROR: Built library is out of date. Run `yarn build` and commit.'
  exit 1
else
  echo -e '\nPASS: Built library matches committed.'
  exit 0
fi
