import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import { Context } from '../context/BlogContext';

const IndexScreen = () => {
  const { state: blogPosts, addBlogPost } = useContext(Context);
  return (
    <View>
      <Text>Index Screen</Text>
      <Button onPress={addBlogPost} title="Add Post" />
      {blogPosts ? (
        <FlatList
          data={blogPosts}
          keyExtractor={(b) => b.title}
          renderItem={({ item: blog }) => <Text>{blog.title}</Text>}
        ></FlatList>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default IndexScreen;
