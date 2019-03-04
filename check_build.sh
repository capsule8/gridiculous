yarn build
if [[ $(git status --short) ]]
then
  echo -e '\n\nERROR: Built library is out of date. Run `yarn build` and commit.'
  exit 1
else
  exit 0
fi
