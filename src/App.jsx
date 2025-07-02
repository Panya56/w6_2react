import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Spin,
  Tooltip,
  Badge,
  Divider,
  FloatButton,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  StarFilled,
  FilterOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((apiData) => {
        setData(apiData.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const cardStyle = {
    borderRadius: "16px",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.9)",
    border: "none",
    boxShadow: "0 8px 24px rgba(149, 157, 165, 0.15)",
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
  };

  const containerStyle = {
    padding: "80px 30px",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px",
  };

  if (loading) {
    return (
      <div
        style={{
          ...containerStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Title level={1} style={headerStyle}>
        PREMIUM CURATED SELECTION
      </Title>

      <Row gutter={[32, 32]} justify="center">
        {data.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Badge.Ribbon
              text={`${Math.round(item.discountPercentage)}% OFF`}
              color="#ff4d4f"
              style={{
                display: item.discountPercentage > 0 ? "block" : "none",
              }}
            >
              <Card
                style={cardStyle}
                hoverable
                bodyStyle={{ padding: "24px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(149, 157, 165, 0.15)";
                }}
                cover={
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: "280px",
                    }}
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      preview={false}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <Tag
                        color="gold"
                        style={{
                          borderRadius: "16px",
                          padding: "6px 10px",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "600",
                          backdropFilter: "blur(4px)",
                          background: "rgba(255, 215, 0, 0.9)",
                        }}
                      >
                        <StarFilled style={{ marginRight: 6 }} />
                        {item.rating}
                      </Tag>
                    </div>
                  </div>
                }
                actions={[
                  <Tooltip title="Add to cart">
                    <Button
                      type="primary"
                      shape="round"
                      icon={<ShoppingCartOutlined />}
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        fontWeight: "600",
                        width: "100%",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    title={
                      wishlist.includes(item.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Button
                      shape="circle"
                      icon={
                        wishlist.includes(item.id) ? (
                          <HeartFilled />
                        ) : (
                          <HeartOutlined />
                        )
                      }
                      style={{
                        color: wishlist.includes(item.id)
                          ? "#ff4d4f"
                          : "#d9d9d9",
                        borderColor: wishlist.includes(item.id)
                          ? "#ff4d4f"
                          : "#d9d9d9",
                        width: "40px",
                        height: "40px",
                      }}
                      onClick={() => toggleWishlist(item.id)}
                    />
                  </Tooltip>,
                ]}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <div>
                    <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
                      {item.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: "14px" }}>
                      {item.brand}
                    </Text>
                  </div>

                  <Tag
                    color="geekblue"
                    style={{
                      borderRadius: "16px",
                      padding: "4px 12px",
                      alignSelf: "flex-start",
                    }}
                  >
                    {item.category}
                  </Tag>

                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    style={{
                      margin: "8px 0",
                      color: "#666",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.description}
                  </Paragraph>

                  <Divider style={{ margin: "12px 0" }} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{
                          fontSize: "22px",
                          fontWeight: "800",
                          color: "#1890ff",
                        }}
                      >
                        ${item.price}
                      </Text>
                      {item.discountPercentage > 0 && (
                        <Text
                          delete
                          style={{
                            marginLeft: "8px",
                            color: "#aaa",
                            fontSize: "14px",
                          }}
                        >
                          $
                          {Math.round(
                            item.price / (1 - item.discountPercentage / 100)
                          )}
                        </Text>
                      )}
                    </div>
                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      {item.stock} left
                    </Text>
                  </div>
                </Space>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton icon={<FilterOutlined />} tooltip="Filter Products" />
        <FloatButton.BackTop
          icon={<ArrowUpOutlined />}
          visibilityHeight={0}
          tooltip="Back to Top"
        />
      </FloatButton.Group>
    </div>
  );
}

export default App;
