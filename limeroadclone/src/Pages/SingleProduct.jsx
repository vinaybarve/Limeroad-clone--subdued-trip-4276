import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Divider,
  Heading,
  Icon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
  Stack,
  SimpleGrid,
  Container,
  useToast,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsShareFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getData } from "../Redux/Mens/action";
import Navbar from "../Components/Navbar";
const SingleProduct = () => {
  const toast = useToast();
  const { id } = useParams();
  const Mens = useSelector((store) => store.MensReducer.Mens);
  const [currentProduct, setCurrentProduct] = useState({});
  const [cartlength, setCartLength] = useState(0);
  console.log("single data", currentProduct);
  const dispatch = useDispatch();

  console.log(currentProduct.price);
  const AddToCart = (product) => {
    console.log("dev", product);

    let cart = localStorage.getItem("cart");

    if (cart) {
      cart = JSON.parse(cart);
      cart.push(product);
      // alert("Item added to the cart");
      toast({
        position: "bottom-left",
        title: "Product Added To The Cart.",
        description: "SuccessFully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartLength(cart.length);
    } else {
      let arr = [];
      arr.push(product);
      toast({
        position: "bottom-left",
        title: "Product Added To The Cart.",
        description: "SuccessFully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      localStorage.setItem("cart", JSON.stringify(arr));
      setCartLength(arr.length);
    }
  };
  useEffect(() => {
    if (Mens.length === 0) {
      dispatch(getData());
    }
  }, [Mens.length, dispatch]);

  useEffect(() => {
    if (id) {
      const currentMensProduct = Mens.find((item) => item.id === Number(id));

      currentMensProduct && setCurrentProduct(currentMensProduct);
    }
  }, [id, Mens]);

  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "black",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
      color: "white",
    },
  };
  const slides = [
    {
      img: `${currentProduct.img1}`,
    },
    {
      img: `${currentProduct.img2}`,
    },
    {
      img: `${currentProduct.img3}`,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 3;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  return (
    <Box p={["1", "0", "10", "10"]} w="fit-content">
      <Navbar/>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={6}
      >
        <Box className="shadow">
          <Flex w="full" overflow="hidden" pos="relative">
            <Flex h="400px" w="full" {...carouselStyle}>
              {slides.map((slide, sid) => (
                <Box
                  key={`slide-${sid}`}
                  boxSize="full"
                  shadow="md"
                  flex="none"
                >
                  <Text
                    color="black"
                    fontSize="xs"
                    p="8px 12px"
                    pos="absolute"
                    top="0"
                  >
                    {sid + 1} / {slidesCount}
                  </Text>
                  <Image
                    ml="100px"
                    src={slide.img}
                    alt="carousel image"
                    boxSize="lg"
                  />
                </Box>
              ))}
            </Flex>
            <Text {...arrowStyles} left="0" onClick={prevSlide}>
              &#10094;
            </Text>
            <Text {...arrowStyles} right="0" onClick={nextSlide}>
              &#10095;
            </Text>
          </Flex>
        </Box>
        <GridItem className="shadow" align="left" h="100%" pl="20px">
          <Box>
            <Text fontSize="3xl">{currentProduct.title}</Text>
            <Text fontSize="sm">{currentProduct.brand}</Text>
            <Box mt="10px">
              <Box>
                <Icon boxSize={["40px", "40px", "30px"]} as={IoLogoWhatsapp} />
                <Icon
                  ml="20px"
                  boxSize={["40px", "40px", "30px"]}
                  as={BsShareFill}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              mt="20px"
              justifyContent="space-between"
              pr="20px"
            >
              <Text> SELECT SIZE</Text>
              <Text> SIZE CHART</Text>
            </Box>
            <Box display="flex" mt="30px" gap={2}>
              <Box
                _hover={{
                  color: "#D53F8C",
                }}
                border="1px solid gray"
                w="40px"
                textAlign="center"
                borderRadius={10}
              >
                <Text fontSize={30}>S</Text>
              </Box>
              <Box
                _hover={{
                  color: "#D53F8C",
                }}
                border="1px solid gray"
                w="40px"
                textAlign="center"
                borderRadius={10}
              >
                <Text fontSize={30}>M</Text>
              </Box>
              <Box
                _hover={{
                  color: "#D53F8C",
                }}
                border="1px solid gray"
                w="40px"
                textAlign="center"
                borderRadius={10}
              >
                <Text fontSize={30}>XL</Text>
              </Box>
              <Box
                _hover={{
                  color: "#D53F8C",
                }}
                border="1px solid gray"
                w="60px"
                textAlign="center"
                borderRadius={10}
              >
                <Text fontSize={30}>XXL</Text>
              </Box>
            </Box>
            <Box mt="10px" display="flex" gap="95px">
              <Box>M.R.P</Box>
              <Box display="flex" gap={1}>
                <Text>: ₹</Text>
                <Text textDecoration="line-through"> 1999</Text>
              </Box>
            </Box>
            <Box mt="10px" display="flex" gap="100px">
              <Box>Price</Box>

              <Box>
                <Text fontSize={20} color="#D53F8C">
                  : ₹ {currentProduct.price}{" "}
                </Text>
              </Box>
            </Box>
            <Box mt="10px" display="flex" gap="70px">
              <Box>You Save</Box>
              <Box>
                <Text>: ₹ 900(45%)</Text>
              </Box>
            </Box>
            <Box mt="10px">
              <Text fontSize="xs">M.R.P. inclusive of all taxes</Text>
            </Box>
            <Box mt="10px" display="flex" gap={5}>
              <Box>
                <Box
                  w="50px"
                  bg="#9C3"
                  border="1px solid #9C3"
                  h="50px"
                  borderRadius={10}
                >
                  <Box ml="15px" mt="15px">
                    <Icon color="white" boxSize="20px" as={BsHeartFill} />
                  </Box>
                </Box>
              </Box>
              <Box
                h="50px"
                w="85%"
                bg="#9C3"
                textAlign="center"
                border="1px solid #9C3"
                borderRadius={10}
              >
                <Heading
                  color="white"
                  onClick={() => {
                    AddToCart(currentProduct);
                  }}
                >
                  ADD TO CART
                </Heading>
              </Box>
            </Box>
            <Box mt="10px" justifyContent="space-between" pr={5} display="flex">
              <Box>
                <Text as="b">SIZE CHART</Text>
              </Box>
              <Box display="flex" gap={3}>
                <Text>centimeter</Text>
                <Text>inch</Text>
              </Box>
            </Box>
            <Box mt="10px">
              <TableContainer>
                <Table variant="simple">
                  <Thead></Thead>
                  <Tbody>
                    <Tr>
                      <Td>STANDARD SIZE</Td>
                      <Td>28</Td>
                      <Td>30</Td>
                      <Td>32</Td>
                      <Td>34</Td>
                      <Td>36</Td>
                      <Td>38</Td>
                      <Td>40</Td>
                      <Td>42</Td>
                    </Tr>
                    <Tr>
                      <Td>brand size</Td>
                      <Td>28</Td>
                      <Td>30</Td>
                      <Td>32</Td>
                      <Td>34</Td>
                      <Td>36</Td>
                      <Td>38</Td>
                      <Td>40</Td>
                      <Td>42</Td>
                    </Tr>
                    <Tr>
                      <Td>waist</Td>
                      <Td>28</Td>
                      <Td>30</Td>
                      <Td>32</Td>
                      <Td>34</Td>
                      <Td>36</Td>
                      <Td>38</Td>
                      <Td>40</Td>
                      <Td>42</Td>
                    </Tr>
                    <Tr>
                      <Td>Hip</Td>
                      <Td>28</Td>
                      <Td>30</Td>
                      <Td>32</Td>
                      <Td>34</Td>
                      <Td>36</Td>
                      <Td>38</Td>
                      <Td>40</Td>
                      <Td>42</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box mt="10px">
              <Text fontSize="xs">
                Sizechart provided is as per the garment measurement and not the
                body
              </Text>
            </Box>
            <Box mt="10px">
              <Text fontSize={15} as="b">
                DELIVERY & RETURN
              </Text>
            </Box>
            <Box mt="5px">
              <Text color="gray">metros :</Text>
              <Text>3-5 working days</Text>
            </Box>
            <Box mt="5px">
              <Text color="gray">other cities :</Text>
              <Text>5-7 working days</Text>
            </Box>
            <Box mt="5px">
              <Text color="gray">areas serviceable only by speed post :</Text>
              <Text>15 working days</Text>
            </Box>
            <Box mt="5px">
              <Text>7 days, no hassle returns! details...</Text>
            </Box>
            <Box mt="15px">
              <Text fontSize={15} as="b">
                Care
              </Text>
              <Text>machine wash</Text>
            </Box>
            <Box mt="15px">
              <Text fontSize={15} as="b">
                Description
              </Text>
              <Text>
                occasion : <Text as="samp">casual wear</Text>
              </Text>
              <Text>
                net quantity : <Text as="samp">1</Text>
              </Text>
              <Text>
                color: <Text as="samp"> black</Text>
              </Text>
              <Text>
                print & pattern :<Text as="samp"> solids</Text>
              </Text>
              <Text>
                length : <Text as="samp"> full length</Text>
              </Text>
              <Text>
                type : <Text as="samp">flat front trousers</Text>
              </Text>
              <Text>
                waist rise :<Text as="samp">high rise</Text>
              </Text>
              <Text>
                set of ( number of units in set) : <Text as="samp">1</Text>
              </Text>
              <Text>
                fit: <Text as="samp">regular fit</Text>
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Box w="100%" mt="50px" h="100px">
        <Box m="auto">
          <Text>Limeroad is offered in : हिन्दी</Text>
        </Box>
        <Box>
          <Box
            display="flex"
            gap={[10, 30, 50, 50]}
            m="auto"
            mt="40px"
            w="fit-content"
          >
            <Box display="grid">
              <Text as="b">About us</Text>
              <Link href={"#"}>Team</Link>
              <Link href={"#"}>Career</Link>
              <Link href={"#"}>Faq</Link>
              <Link href={"#"}>Contact Us</Link>
              <Link href={"#"}>Settings</Link>
            </Box>

            <Box display="grid">
              <Text as="b">Orders</Text>
              <Link href={"#"}>Terms of Use</Link>
              <Link href={"#"}>Privacy Policy</Link>
              <Link href={"#"}>Return Policy</Link>
              <Link href={"#"}>Disclaimer</Link>
            </Box>
          </Box>
        </Box>

        <Box w="100%" mt="50px" h="100px">
          <Box m="auto">
            <Text>Limeroad is offered in : हिन्दी</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleProduct;
