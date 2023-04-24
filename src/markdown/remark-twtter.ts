import { h } from "hastscript"
import type { Root } from "remark-directive"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"

export const remarkTwitter: Plugin<Array<void>, Root> = () => (tree, file) => {
  visit(tree, (node) => {
    if (
      node.type === "textDirective" ||
      node.type === "leafDirective" ||
      node.type === "containerDirective"
    ) {
      if (node.name !== "twitter" && node.name !== "tw") return
      if (node.type !== "textDirective")
        file.fail("Please use text directive for `twitter`")

      if (node.children[0].type !== "text" || node.children[0].value === "") {
        file.fail("Missing twitter name in content")
      }
      const data = node.data || (node.data = {})
      // @ts-ignore
      const twitterName = node.children[0].value

      const twitterAst = h(
        "span",
        {
          class: "xlog-post-content-twitter",
        },
        [
          h(
            "a",
            {
              target: "_blank",
              rel: "noreferrer nofollow",
              href: `https://twitter.com/${twitterName}`,
            },
            `twitter: ${twitterName}`,
          ),
        ],
      )

      data.hName = twitterAst.tagName
      data.hProperties = twitterAst.properties
      data.hChildren = twitterAst.children
    }
  })
}
