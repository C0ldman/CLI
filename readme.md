This CLI will help you to create presentation.

**Install**

**`npm i -g cobalt-fill`**

**Usage**

In presentation directory type in terminal

**`cobalt-fill [options] <slide ID>`**

**Options:**

**`-h --html`**

Adding model,localization,styles by tags from HTML-file. Don't including co-image tags(to include all tags add option -i)

**`-i --images`**

Adding model,localization,styles for co-images from HTML(if ID of co-image tag == filename, half dimensions of image will be added to styles automatically)

**`-f --files`**

Adding HTML-tags,models and styles for images from slide's images folder. Checks dimensions for odd values and adding transparent pixels if needed.

**`-s --size`**

Don't make half size of images in styles(add dimensions of image "as is")

**`-c --compress`**

Compressing images (reduce the file size)
