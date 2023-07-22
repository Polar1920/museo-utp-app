# Museo
App móvil de un Museo titulado: Tecnología en el Tiempo 
Proyecto del curso Desarrollo de Software VI de la Universidad Tecnológica de Panamá

### Link del Wireframe en Figma
https://www.figma.com/file/5aPtaQ1VVf1tjEK29omzzV/Museo?type=design&node-id=0%3A1&mode=design&t=ufkGRbtgOxJFi67n-1

## Instalación de la ultima version de ionic
- npm install @ionic/angular@latest

## Instalación de la ultima version de capacitor
- npm install @capacitor/core@latest @capacitor/cli@latest

## Inicar proyecto llamado Museo de tipo angular/capacitor
- ionic start Museo tabs --type=angular --capacitor

## Instalación de componententes para QR
- npm install phonegap-plugin-barcodescanner
- npm install @awesome-cordova-plugins/barcode-scanner
- ionic cap sync

## Instalación del swiper para TimeLine
- npm install swiper@latest

## Importaciones necesarias en el AndroidManifest
- < uses-permission android:name="android.permission.CAMERA" / >
- < uses-permission android:name="android.permission.FLASHLIGHT"/ >

### Para cambiar el icono y el nombre de la app
- android:icon="@drawable/logo_icon"
- android:label="@string/app_name"

### Fixes
-Error gradle al compilar para android: cambiar barcodescanner.gradle de compile a implementation
