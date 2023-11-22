import { prisma } from "../../config/prisma.config";
import createGraphQLError from "../../errors/graphql.error";
import { createBanner, updateBanner } from "../../types/banner.type";
import { photoUpload } from "../../helpers/cloudnary.photoUpload";

export default {
    Query: {
        getAllBanner: async (_: any, __: any) => {
            let banner = await prisma.banner.findMany({
                include: {
                    ProductType: {include:{productCategory:true}},
                    
                }
            });
            return banner;
        },
    },
    Mutation: {
        createBanner: async (_: any, { input }: { input: createBanner },) => {
            let { title, description, image, productTypeId } = input;
            image = await photoUpload(image)
            let bannerInfo = await prisma.banner.create({
                data: {
                    title,
                    description,
                    image,
                    ProductType: { connect: { id: productTypeId } }
                }
            });
            return bannerInfo;
        },
        deleteBanner: async (_: any, { bannerId }: { bannerId: string },) => {
            let deleteBanner = await prisma.banner.delete({
                where: {
                    id: bannerId
                }
            });
            return {
                status: true,
                message: "Banner successfully deleted"
            }
        },
        updateBanner: async (_: any, { input }: { input: updateBanner }) => {
            let { id, title, description, image, productTypeId } = input;
            if (image != undefined) {
                image = await photoUpload(image)
            }
            let bannerUpdate: any = {
                ...(title ? { title: title } : {}),
                ...(description ? { description: description } : {}),
                ...(image
                    ? { image: await photoUpload(image) }
                    : {}),
            };
            let banner = await prisma.banner.update({
                where: {
                    id: id,
                },
                data: bannerUpdate
            })
            return {
                status: true,
                message: 'Banner successfully updated',
                data: banner
            }
        }
    },
};
