# arcgis-geobim
Dashboard webapp som kombinerer 3D GIS, BIM, sensor og voxeldata i en digital tvilling av byggeplassen. Appen er tilgjengelig på [GitHub Pages](https://ingean.github.io/arcgis-geobim).
 
## BIM-data
Appen bruker AutoDesk Forge Viewer til å vise fram BIM-modeller. For å vise en BIM i Forge Vieweren så må den tilgjengeliggjøres for ModelDerivate API'et og ha et manifest. Dette gjøres ved å utføre et sett med kall til ModelDerivate API'et som er dokumentert [her](https://github.com/Autodesk-Forge/forge-tutorial-postman/tree/master/ModelDerivative_07). 

Ferdige oppsettsfiler for å utføre kallene i Postman finnes i katalogen Postman. For å utføre disse kallene kreves en Forge lisens (funker med trial account).

I denne demoen er data lastet opp til ossBucketKey: geotek_2021 på min gmail bruker. 

## Sensordata
Appen konsumerer et streamlayer fra ArcGIS Enterprise (GeoEvent). Virker som det er en bug som ikke gjør det mulig å benytte streamlayer fra Velocity. 
