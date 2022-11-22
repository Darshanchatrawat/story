import { useState } from "react";

import { Link } from "react-router-dom";
import { Card, CardBody } from "@windmill/react-ui";
import styled from "styled-components";

//icon
import Logo from "../../assets/img/logo.png";
import { DropdownIcon } from "../../icons";

export default function HeaderCard({ title, desc, hideCollapse }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      colored
      className="text-white bg-purple-600"
      style={{ background: "var(--blue-gradient)" }}
    >
      <CardBody>
        <TopContainer className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-lg  font-bold text-gray-800 dark:text-gray-200"
            >
              <HeaderLogo src={Logo} alt="" className="h-6  w-auto" />
            </Link>
            <Title hidden={!open} className="pl-5 ">
              {title}
            </Title>
          </div>
          <div hidden={hideCollapse} onClick={() => setOpen(!open)}>
            {open ? (
              <DropdownIcon height={"2rem"} width={"2rem"} cursor="pointer" />
            ) : (
              <DropdownIcon
                height={"2rem"}
                width={"2rem"}
                cursor="pointer"
                className="rotate-180"
              />
            )}
          </div>
        </TopContainer>
        <Container hidden={open}>
          <Title>{title}</Title>
          {desc ? (
            <Desc>{desc}</Desc>
          ) : (
            <Desc>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
              cum commodi a omnis numquam quod? Totam exercitationem quos hic
              ipsam at qui cum numquam, sed amet ratione! Ratione, nihil
              dolorum.
            </Desc>
          )}
        </Container>
      </CardBody>
    </Card>
  );
}

const TopContainer = styled.div``;
const HeaderLogo = styled.img`
  background: #ffffff;
  border-radius: 20px;
  width: 120px;
  height: 40px;
  object-fit: contain;
  padding: 10px;

  @media (max-width: 480px) {
    width: 90px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    width: 100px;
  }
`;

const Title = styled.h1`
  margin: 1rem 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #ffffff;
  @media (max-width: 480px) {
    font-size: 17px;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    line-height: 10px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    margin-bottom: 1px;
    margin-top: 1px;
    font-size: 23px;
  }
`;

const Desc = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;

  color: #ffffff;
  @media (max-width: 480px) {
    font-size: 10px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    font-size: 12px;
  }
`;

const Container = styled.div``;
