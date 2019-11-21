import {
  mockDate,
  ownerLoaderData
} from "components/details/details.loader-data";
import { ProgramDetailsList } from "gv-api-web";
import { personalProgramDetailsLoaderData } from "pages/programs/program-details/program-details.loader-data";
import { getRandomColor, getRandomInteger } from "utils/helpers";
import { tableLoaderCreator } from "utils/helpers";

const tagLoaderDataCreator = () /*: ProgramTag*/ => ({
  name: "program",
  color: getRandomColor()
});
const tagsLoaderDataCreator = () =>
  // ProgramTag[] =>
  tableLoaderCreator(tagLoaderDataCreator);

export const programDetailsLoaderDataCreator = (): ProgramDetailsList => ({
  balance: {
    currency: "GVT",
    amount: 100
  },
  level: getRandomInteger(0, 100),
  levelProgress: getRandomInteger(0, 100),
  periodDuration: getRandomInteger(0, 100),
  periodStarts: new Date("2019-09-23T20:58:38.8147750+00:00"),
  periodEnds: new Date("2019-09-25T02:58:38.8147750+00:00"),
  personalDetails: personalProgramDetailsLoaderData,
  tags: tagsLoaderDataCreator(),
  id: "",
  logo: "",
  url: "",
  color: getRandomColor(),
  title: "Program",
  description: "",
  status: "None",
  creationDate: mockDate,
  owner: ownerLoaderData,
  currency: "GVT",
  availableToInvest: getRandomInteger(0, 100),
  investorsCount: getRandomInteger(0, 100),
  statistic: {
    chart: [],
    profit: getRandomInteger(0, 100),
    drawdown: getRandomInteger(0, 100)
  }
});

export const programListLoaderData = tableLoaderCreator(
  //: ProgramDetailsOld[]
  programDetailsLoaderDataCreator
);

export const programTableLoaderData = {
  //: ProgramsListOld
  programs: programListLoaderData,
  total: programListLoaderData.length
};
