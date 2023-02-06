// @ts-nocheck

import React from 'react';
import tw, { styled } from 'twin.macro';

const Title = styled.h1(tw`text-5xl`);

export default function Home() {
  return <Title>React Starter</Title>;
}
