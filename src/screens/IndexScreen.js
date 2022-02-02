import React, { useContext, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
  const {
    state: blogPosts,
    deleteBlogPost,
    getBlogPosts,
  } = useContext(Context);

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      {blogPosts ? (
        <FlatList
          data={blogPosts}
          keyExtractor={(b) => b.id}
          renderItem={({ item: post }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Show', { id: post.id });
              }}
            >
              <View style={styles.row}>
                <Text style={styles.text}>
                  {post.title} - {post.id}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteBlogPost(post.id);
                  }}
                >
                  <Feather name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      ) : null}
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
