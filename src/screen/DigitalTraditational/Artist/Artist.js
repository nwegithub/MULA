import React,{useContext,useRef,useState,useEffect} from "react";
import {View,TouchableOpacity,StyleSheet,Image,FlatList,SafeAreaView} from "react-native"
import icons from "../../../constant/icons";
import { style } from "../../../constant/style";
import { colors, fonts } from "../../../constant/theme";
import { Context } from "../../../component/Context";
import LinearGradient from "react-native-linear-gradient";
import { scaleHeight } from "../../../utils/responsive";
import AnimatedImage from "../../../component/AnimatedImage";
import { GET_ARTIST } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import ArtistFilter from "./Component/ArtistFilter";
import ArtistFilterModal from "./Component/ArtistFilterModal";


const Artist = ({navigation,data,artistNameSelected,setArtistNameSelected,setArtistName}) =>{

    const {digital} = useContext(Context)
    const flatListRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [artistModalOpen,setArtistModalOpen] = useState(false)
    const [sort,setSort] = useState("asc")

    
    const {data:filterData,refetch} = useQuery(GET_ARTIST, {variables:{
        artistType: digital? "Digital" : "Traditional",
        artistName: "%%",
        artistName_mm: "%%",
        sort:sort
    },fetchPolicy: 'network-only'});


    useEffect(() => {
        if (artistNameSelected.artist_name === "All" || artistNameSelected.artist_name_mm === "အားလုံး"){
            setArtistName({ artist_name: "%%", artist_name_mm: "%%" });
      
          }else if (artistNameSelected !== "") {
            setArtistName(artistNameSelected);
          } 
          
          
        }, [artistNameSelected]);

    let artistArray = filterData?.artist
    const newArr1 = [{ artist_name: "All", artist_name_mm: "အားလုံး" }]
    const newArr2 = [{ artist_name: "See All", artist_name_mm: "အားလုံးကြည့်ရန်" }]
  
    const updateArtistArray = newArr1.concat(artistArray)
    const newArtistArray = updateArtistArray.concat(newArr2)

    
    return(
            <SafeAreaView  style={{flex:1}}>
                <ArtistFilter
                artistNameSelected={artistNameSelected}
                setArtistNameSelected={setArtistNameSelected}
                newArtistArray={newArtistArray}
                flatListRef={flatListRef}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setArtistModalOpen={setArtistModalOpen}
                
                />

            <FlatList
            row={2}
            numColumns={2}
            data={data.artist }
            showsVerticalScrollIndicator={false}
            refreshing={data.networkStatus === 4}
            onRefresh={async () => {
            await refetch();
             }}
            renderItem={({item,index}) =>{
                return(
                    <>
                    {
                        !digital ?
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('ArtistDetail',{
                            ArtistId:item.id,
                            
                        })}
                    style={styles.container}
                    key={item.id}>
                        <AnimatedImage uri={item.artist_profile_image_url}
                        resizeMode="cover"
                        style={{width:'100%',height:'100%',borderRadius:digital? 30: 100}}/>
                        
                    </TouchableOpacity>
                    :

                   
                    <LinearGradient
                   colors={colors.linearBorder}
                   start={{x:0,y:1}}
                   end={{x:1,y:0}}
                   style={styles.digitalContainer}
                   >
                     <TouchableOpacity
                   onPress={() => navigation.navigate('ArtistDetail',{
                    ArtistId:item.id
                })}
                    style={{width:'97%',height:'97%',borderRadius:20}}
                    >
                     <AnimatedImage uri={item.artist_profile_image_url}
                        resizeMode="cover"
                        style={{width:'100%',height:'100%',borderRadius:20}}/>
                    </TouchableOpacity>
                   </LinearGradient>
                   

                    }
                    
                   
                   </>
                )
            }}

            contentContainerStyle={{paddingBottom:80,paddingHorizontal:20}}
            
            />
            <ArtistFilterModal
             artistModalOpen={artistModalOpen}
             setArtistModalOpen={setArtistModalOpen}
             artistArray={artistArray}
             setArtistNameSelected={setArtistNameSelected}
             artistNameSelected={artistNameSelected}
             setSort={setSort}
            />

            </SafeAreaView>
       
    )
} 
export default Artist

const styles = StyleSheet.create({
    container:{width:'42%',margin:15,height:scaleHeight(220),borderRadius:100,backgroundColor:colors.lightWhite,marginBottom:10,borderWidth:1,borderColor:colors.lightWhite,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,},
    digitalContainer:{width:'42%',margin:15,height:scaleHeight(210),borderRadius:20,justifyContent:'center',alignItems:'center',}
})