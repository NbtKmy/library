# Codes for library web sites
This repo contains the web sites of the AOI library (Japan).
Because of the reorganization of the library structure, the offcial library web sites (2021) should be migrated into somowhere in 2022.
Some pages could not be migrated - I don't know which sites will be erased through this action.
This repo has thus the archiving function.

## Pages

There are some pages for the Japan library.  

* Signatursystematik  
You find the "Signatursystematik (System for the shelf number)" of the library. You can also "browse" the library books online.  
https://nbtkmy.github.io/library/systematik.html

* Library gallery  
The library has digitized her rare materials for the archiving purpose. Several materials are published as IIIF images here.  
https://nbtkmy.github.io/library/images.html  

    * IIIF image server: [Cantaloupe](https://cantaloupe-project.github.io/)  
    * IIIF image viewer: [Mirador](https://projectmirador.org/)  

* Neuerwerbungsliste Test  
https://nbtkmy.github.io/library/Neuerwerbungsliste_test.html

## Shell script  

rw2_to_jpg.sh  
Diese Shell script konvertiert die RW2-Daten in jpg-Format.

Requirements:
* dcraw
* cjpeg

Usage: 
`./rw2_to_jpg.sh /path/to/your/folder/with/RW2/data`


