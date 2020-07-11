
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Container, Content, Item, Card, Text, CardItem, Body } from 'native-base';

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temprature: '',
      weatherIcon: null,
      windSpeed: '',
      precip: '',
      animating: false
    }
  }

  componentDidMount() {
    let { capital } = this.props.navigation.state.params
    this.getWeatherData(capital)
  }
  getWeatherData = (capital) => {
    console.log(capital)
    this.setState({
      animating: true
    })
    fetch(`http://api.weatherstack.com/current?access_key=f1645c2ffae1262a5aec6d862dd52e5d&query=${capital}`)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          animating: false
        })
        if (response.status == 404) {
          alert(response.message)
        } else {
          this.setState({
            temprature: response.current.temperature,
            weatherIcon: response.current.weather_icons[0],
            windSpeed: response.current.wind_speed,
            precip: response.current.precip,
          })
        }
      }).catch((error) => {
        this.setState({
          animating: false
        })
        console.log('error', error)
      })
  }

  render() {
    return (
      <Container>
        <Content>
          <CardItem>
            <Card style={{ padding: 5, flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Temperature: </Text>{this.state.temprature}</Text>
                  <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Wind Speed: </Text>{this.state.windSpeed}</Text>
                  <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Precip: </Text>{this.state.precip}</Text>
                </View>
                <Image style={{ width: 100, height: 100 }} resizeMode='contain' source={{ uri: this.state.weatherIcon }} />
              </View>
            </Card>
          </CardItem>
        </Content>
        {
          this.state.animating &&
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        }
      </Container>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
});
