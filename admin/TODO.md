# wmedressupgame To do:

#### General/ admin todo:
- [ ] add docstrings for all functions (important so we can see how they work at a glance)
- [ ] add a readme .md file (low priority but easy mindless work)

#### script todo:
- [ ] fix item drag bugs
- [ ] add a size and rotation slider for dressup items
- [ ] add flip horizontal option for items and scene
- [x] add a way to remove an item from the stage
- [ ] add counter for inventory- decrease item availability as items are added to stage, and implement this across all saved equid dressups in user account in future.

#### backend todo:
- [x] add database (pond) (it's happening! it's in the works)

#### frontend todo:
- [ ] add select equid dropdown functionality
- [x] add account creation/login 
- [ ] add equid upload page
- [x] add scroll for overflowing items and backdrops in containers-- horizontal for items, vertical for backdrops
- [ ] add website theme selector to change site looks
- [x] make the stage and doll centred inside the game container
- [ ] change the game window system so that there are buttons in the game navbar for settings, items, and backdrops, and buttons for delete item, help, and reset all. The navbar buttons will open a sidebar where items can be chosen instead of a static bottom tray for items settings etc.

# Bugs:
- drag and drop not work when window scrolled down
- items clashing together when dragging
- item stops dragging when cursor moves too fast
- items do not resize in scale with doll when window size changes
- items can be placed outside of the stage window
- items not in scale with the equid image by default

# Login & equid upload System:
- setup hashing for passwords
- connect database to repository
- for verifying login, hash the entered password and check if it matches the stored hash.
- connect / link other acounts like discord, deviantart, cs, toyhou.se etc


- for equid upload system:
  - users paste the url of their equid and we write a script to scrape:
    - creation date, 
    - image, 
    - artist name
    - no other details can be scraped due to format inconsistency
  - users self-input:
    - equid name
    - owner
    - sire link
    - dam link
    - sex
    - gender

# Bugs
- game items need to scale with doll on window resize
- game item movement system is buggy