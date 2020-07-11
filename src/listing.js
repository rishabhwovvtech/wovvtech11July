
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Container, Header, Item, Input, Icon, Card, Text, CardItem, Body, Button } from 'native-base';
import { SvgCssUri } from 'react-native-svg';


export default class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            searchData: [],
            animating: false
        }
    }

    getData = () => {
        this.setState({
            animating: true
        })
        fetch(`https://restcountries.eu/rest/v2/name/${this.state.country}`)
            .then((res) => res.json())
            .then((response) => {
                this.setState({
                    animating: false
                })
                console.log('response', response)
                this.setState({
                    searchData: response,
                })
            }).catch((error) => {
                this.setState({
                    animating: false
                })
                console.log('error', error)
            })
    }

    _renderItem = ({ item, index }) => (
        <Card>
            <CardItem>
                <Body>
                    <Item>
                        <SvgCssUri
                            width={100}
                            height={80}
                            uri={item.flag}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Capital: </Text>{item.capital}</Text>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>Population: </Text>{item.population}</Text>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: 'bold' }}>latlng: </Text>{item.latlng[0]}, {item.latlng[1]}</Text>
                        </View>
                    </Item>
                    <Button primary rounded full small style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate('Details', { capital: item.capital })}>
                        <Text>Capital Weather</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    )

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Input
                            placeholder=" Enter country"
                            value={this.state.country}
                            onChangeText={(val) => { this.setState({ country: val }) }}
                        />
                        <Button primary rounded small style={{ marginRight: 5 }} onPress={() => this.getData()}>
                            <Icon button name="ios-search" />
                        </Button>
                    </Item>
                </Header>
                <FlatList
                    style={{ margin: 10 }}
                    data={this.state.searchData}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    legacyImplementation={true}
                />
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
