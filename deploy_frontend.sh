#cd frontend
sudo chown -R alexcontes dist
sudo npm run build
sudo cp dist2/.htaccess dist/.htaccess
sudo cp dist2/widget_js.php dist/widget_js.php
sudo cp -r dist2/api dist/api
cd ..
sudo git add .
sudo git commit -m "Fixed scheduled reports."
sudo git push