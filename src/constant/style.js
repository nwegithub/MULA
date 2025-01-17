import { scaleWidth,scaleHeight } from "../utils/responsive";
export const style = {
    shadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    flexRowSpace: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
   
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    signButtom: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 15,
    },
    distance: {
        padding: 10,
        margin: 10,
    },
    
    button: {
        height: 42,
        width: '100%',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#945708'
    },
    textinput: {
        //borderWidth:1,
        borderRadius:16,
        marginTop:25,
        paddingHorizontal:10,
        height:scaleHeight(46)
    },
    posIcon:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        width: scaleWidth(23), height: scaleHeight(23),resizeMode:"contain"
    }
};
