mv dist committed_dist
yarn build
diff -r dist committed_dist
echo 'last exit code:' $?
