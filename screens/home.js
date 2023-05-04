import { useState, useEffect } from 'react'
import {
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Pressable,
  TextInput,
  ImageBackground
} from 'react-native';

import tw from 'twrnc';

import requests from '../services/request';

import N from '../static/images/N.svg'
import { MagnifyingGlassIcon, PlayIcon, PlusIcon } from 'react-native-heroicons/outline';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { TvIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native-gesture-handler';

const baseUrl = process.env.BASE_URL
const apiKey = process.env.API_KEY
const imgAssets = process.env.IMG_ASSETS

const imageURL = 'https://image.tmdb.org/t/p/original'

const Home = () => {
  const [ cardImage, setCardImage ] = useState()
  const [ cardGenres, setCardGenres ] = useState()
  const [ topTv, setTopTv ] = useState()

  useEffect(() => {
    fetch(`${baseUrl}${requests.fetchTopRated}`).then(res => res.json()).then((data) => {
      setCardImage(data.results[2])
    })
  }, [])

  useEffect(() => {
    fetch(`${baseUrl}/movie/${cardImage?.id}?api_key=${apiKey}`).then(res => res.json()).then((data) => {
    setCardGenres(data.genres)
    })
  }, [])

  useEffect(() => {
    fetch(`${baseUrl}${requests.fetchTrendingTv}`).then(res => res.json()).then((data) => {
      setTopTv(data.results)
    })
  }, [])

  // console.log(cardImage);
  // console.log(cardGenres);
  console.log(cardImage);

  const imageBg = `${imageURL}${cardImage?.backdrop_path}`
  console.log(imageBg);

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1`}
        >
          <View>
            <View style={tw`py-2 px-4 flex flex-row items-center justify-between`}>
              <N/>
              <View style={tw`ios:hidden mt-1 w-55`}>
                <MagnifyingGlassIcon style={tw`absolute z-10 left-2 top-2 text-gray-400 h-8`} />
                <TextInput
                    style={tw`pr-4 pl-10 h-10 font-medium bg-white rounded w-full text-white`}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder='Buscar'
                    placeholderTextColor={tw.color('text-gray-400')}
                />
              </View>
              <TvIcon style={tw`text-white h-6 h-6`}/>
              <View style={tw`bg-yellow-300 h-6 w-6 rounded`}></View>
            </View>
            <View style={tw`flex flex-row justify-between px-10 py-1 `}>
              <Pressable style={tw`border border-white rounded-xl px-2 items-center`}><Text style={tw`text-white`}>TV Series</Text></Pressable>
              <Pressable style={tw`border border-white rounded-xl px-2`}><Text style={tw`text-white`}>Peliculas</Text></Pressable>
              <Pressable  style={tw`flex flex-row gap-2 border border-white rounded-xl px-2`}><Text style={tw`text-white`}>Categorias</Text><ChevronDownIcon style={tw`text-white`}/></Pressable>
            </View>
          </View>
          <ScrollView>
            <View style={tw`flex items-center mt-2`}>
              <ImageBackground 
                style={tw`relative z-10 flex items-center justify-end rounded-2xl h-[450px] w-90 m-4 border border-white/10 overflow-hidden`}
                source={{uri: imageBg}}
                resizeMode='cover'
              >
                <View style={tw`flex justify-center items-center m-5`}>
                  <View style={tw`flex flex-row items-center`}>
                      <N height={20} />
                      <Text style={tw`text-white/80 font-black text-xs tracking-[0.3rem]`}>SERIE</Text>
                  </View>
                  <Text style={tw`text-white text-4xl uppercase text-center`}>{cardImage?.original_title}</Text>
                  <View style={tw`flex flex-row gap-3 m-3`}>
                      <Pressable style={tw`bg-white px-4 py-2 rounded flex flex-row items-center gap-2`}>
                        <PlayIcon style={tw`text-black`} /><Text style={tw`text-black text-base font-bold`}>Reproducir</Text>
                      </Pressable>
                      <Pressable style={tw`bg-black/80 px-4 py-2 rounded flex flex-row items-center justify-center gap-2 w-40`}>
                        <PlusIcon style={tw`text-white`}/><Text style={tw`text-white text-base font-bold`}>Mi lista</Text>
                      </Pressable>
                  </View>
                  <View style={tw`flex flex-row gap-3`}>
                    {cardGenres?.map((genre, i) => {
                      return <Text key={i} style={tw`text-white`}>{genre.name}</Text>
                    })}
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={tw`flex flex-row gap-3 px-8`}>
              <Text style={tw`text-white text-xl`}>Categorias</Text>
            </View>
            <View>
              <View style={tw`flex flex-row`}>
                {topTv?.map((tv, i) => {
                  return (
                    <ImageBackground
                      key={i} 
                      style={tw`relative z-10 flex items-center justify-end bg-stone-500 rounded-2xl h-[150px] w-30 m-4 border border-white/10 overflow-hidden`}
                      source={{uri: `${imageURL}${tv?.backdrop_path}`}}
                      resizeMode='cover'
                    ></ImageBackground>
                  )
                })}
              </View>
            </View>          
          </ScrollView>
        
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
};

export default Home;
