import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "数学",
    Svg: require("@site/static/img/subject-math.svg").default,
    description: (
      <>
        数学，是研究数量、结构、变化、空间以及信息等概念的一门学科。数学是人类对事物的抽象结构与模式进行严格描述、推导的一种通用手段，可以应用于现实世界的任何问题，所有的数学对象本质上都是人为定义的。从这个意义上，数学属于形式科学，而不是自然科学。不同的数学家和哲学家对数学的确切范围和定义有一系列的看法。
      </>
    ),
  },
  {
    title: "物理",
    Svg: require("@site/static/img/subject-physics.svg").default,
    description: (
      <>
        物理学，是研究物质最一般的运动规律和物质基本结构的学科。作为自然科学的带头学科，物理学研究大至宇宙，小至基本粒子等一切物质最基本的运动形式和规律，因此成为其他各自然科学学科的研究基础。物理学起始于伽利略和牛顿的年代，它已经成为一门有众多分支的基础科学。物理学是一门实验科学，也是一门崇尚理性、重视逻辑推理的科学。
      </>
    ),
  },
  {
    title: "计算机",
    Svg: require("@site/static/img/subject-cs.svg").default,
    description: (
      <>
        计算机科学，研究计算机及其周围各种现象和规律的科学，亦即研究计算机系统结构、程序系统（即软件）、人工智能以及计算本身的性质和问题的学科。计算机科学是一门包含各种各样与计算和信息处理相关主题的系统学科，从抽象的算法分析、形式化语法等等，到更具体的主题如编程语言、程序设计、软件和硬件等。
      </>
    ),
  },
  {
    title: "经济学",
    Svg: require("@site/static/img/subject-economics.svg").default,
    description: (
      <>
        经济学是研究个人、企业、政府以及其他团体如何在社会内进行选择，以及这些选择如何决定社会稀缺性资源使用的科学。简单来说，经济学是一门指导如何以理性的态度选择与分配资源的社会科学。经济学的对象是研究人类经济活动的本质，揭示经济现象的发展规律，帮助人们认识社会经济现象。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx("row", styles.featuresRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
