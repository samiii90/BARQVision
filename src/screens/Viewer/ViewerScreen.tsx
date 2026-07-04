import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import WebView from 'react-native-webview';

import {Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';

import {STREAM_URL} from '../../services/camera/cameraConfig';

export const ViewerScreen = () => {

  const navigation = useNavigation();

  const html = `
<!DOCTYPE html>
<html>
<head>

<meta name="viewport"
content="width=device-width,
initial-scale=1,
maximum-scale=1"/>

<style>

html,body{

margin:0;
padding:0;

background:black;

overflow:hidden;

width:100%;
height:100%;

}

img{

width:100%;
height:100%;

object-fit:cover;

}

</style>

</head>

<body>

<img src="${STREAM_URL}" />

</body>

</html>
`;

  return (

<View style={styles.container}>

<StatusBar hidden />

<WebView

originWhitelist={['*']}

source={{
html,
baseUrl:'',
}}

javaScriptEnabled

allowsInlineMediaPlayback

scrollEnabled={false}

bounces={false}

style={StyleSheet.absoluteFill}

/>

<View style={styles.overlay}>

<View style={styles.topBar}>

<Text style={styles.title}>
BARQ CAM
</Text>

<Text style={styles.live}>
● LIVE
</Text>

</View>

<View style={styles.crosshair}>

<View style={styles.horizontal}/>

<View style={styles.vertical}/>

</View>

<View style={styles.bottomBar}>

<Text style={styles.bottomText}>
MJPEG
</Text>

<TouchableOpacity
onPress={()=>navigation.goBack()}>

<Text style={styles.exit}>

EXIT

</Text>

</TouchableOpacity>

</View>

</View>

</View>

  );

};

const styles=StyleSheet.create({

container:{

flex:1,

backgroundColor:'black',

},

overlay:{

...StyleSheet.absoluteFillObject,

justifyContent:'space-between',

padding:24,

},

topBar:{

flexDirection:'row',

justifyContent:'space-between',

alignItems:'center',

},

title:{

color:'white',

fontSize:20,

fontWeight:'900',

letterSpacing:2,

},

live:{

color:'#00ff66',

fontWeight:'bold',

fontSize:18,

},

bottomBar:{

flexDirection:'row',

justifyContent:'space-between',

alignItems:'center',

},

bottomText:{

color:'white',

fontWeight:'bold',

},

exit:{

color:'red',

fontWeight:'900',

fontSize:18,

},

crosshair:{

position:'absolute',

top:'50%',

left:'50%',

width:80,

height:80,

marginLeft:-40,

marginTop:-40,

justifyContent:'center',

alignItems:'center',

},

horizontal:{

position:'absolute',

width:80,

height:2,

backgroundColor:'#00ff66',

},

vertical:{

position:'absolute',

height:80,

width:2,

backgroundColor:'#00ff66',

},

});
