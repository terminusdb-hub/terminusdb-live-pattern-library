
import React from 'react';
import renderer from "react-test-renderer";
import prettyPrintComponent from '../src/prettyPrintComponent'

test('Props is displayed', () => {
  const component = renderer.create(
    <prettyPrintComponent title="Hello" />
  );
  const instance = component.root;
  expect(
    instance.findByProps({ className: "title" }).children
  ).toEqual(
    ["Hello"]
  );
});
