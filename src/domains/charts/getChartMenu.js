export default (
  { id, name, family, context, priority, chartLabels },
  submenuNames,
  { hasKubernetes, composite } = {}
) => {
  const subMenuId = family || "all"
  const clusterId = hasKubernetes && chartLabels?.k8s_cluster_id?.[0]
  const clusterName = hasKubernetes && chartLabels?.k8s_cluster_name?.[0]

  const [type, typeB, typeC] = id.split(".")

  const parts = type.split("_")
  const [part1, part2] = parts

  const emit = ({ menuPattern, menu = type, ...props }) => ({
    // initial values should be empty strings, but we keep the compatibility with the netdata-dashboard
    chartId: id,
    id: menu,
    menu, // deprecated
    subMenuId,
    submenu: subMenuId, // deprecated
    menuPattern,
    menu_pattern: menuPattern, // deprecated
    sectionTitle: undefined,
    priority,
    ...props,
  })

  const emitMultipartMenu = partName => {
    const menuPattern = parts.length > 2 && parts[1] === partName ? `${part1}_${part2}` : part1
    return emit({ menuPattern })
  }

  switch (part1) {
    case "ap":
    case "net":
    case "powersupply":
      return emit({ menu: part1 })

    case "cpufreq":
    case "cpuidle":
      return emit({ menu: "cpu" })

    case "smartd":
    case "web":
      return emitMultipartMenu("log")
    case "apache":
      return emitMultipartMenu("cache")
    case "bind":
      return emitMultipartMenu("rndc")
    case "go":
      return emitMultipartMenu("expvar")
    case "isc":
      return emitMultipartMenu("dhcpd")
    case "anomaly":
      return emit({})

    case "disk": {
      if (/(inodes|space)/.test(typeB) || /(inodes|space)/.test(part2))
        return emit({ menu: "mount" })
      return emit({ menu: part1 })
    }
    case "mount": {
      return emit({ menu: part1 })
    }

    case "k8s": {
      if (composite) {
        if (part2 === "state") {
          if (clusterName) return emit({ menu: `Kubernetes State ${clusterName}` })
          else if (clusterId) return emit({ menu: `Kubernetes State ${clusterId}` })
          else return emit({ menu: "Kubernetes State" })
        }

        if (!part2 || part2 === "container") {
          if (clusterName) return emit({ menu: `Kubernetes Containers ${clusterName}` })
          else if (clusterId) return emit({ menu: `Kubernetes Containers ${clusterId}` })
          else return emit({ menu: "Kubernetes Containers" })
        }

        return emit({ menu: `Kubernetes ${part2}` })
      }

      const menuPattern = parts.length > 1 ? part1 : undefined
      return emit({ menuPattern })
    }

    case "cgroup": {
      if (clusterName) return emit({ menu: `Kubernetes Containers ${clusterName}` })
      else if (clusterId) return emit({ menu: `Kubernetes Containers ${clusterId}` })

      const menuPattern =
        id.match(/.*[._/-:]qemu[._/-:]*/) || id.match(/.*[._/-:]kvm[._/-:]*/) ? "cgqemu" : "cgroup"
      const sectionTitle = parts.length === 1 ? "cgroups" : undefined
      return emit({ menuPattern, sectionTitle })
    }

    case "ovpn": {
      const menuPattern =
        parts.length > 3 && parts[1] === "status" && parts[2] === "log"
          ? `${part1}_${part2}`
          : part1
      return emit({ menuPattern })
    }

    case "dnsmasq": {
      if (parts.length == 2 && parts[1] === "dhcp") {
        return emit({ menu: `${part1}_${part2}` })
      }
      if (parts.length >= 2 && parts[1] === "dhcp") {
        return emit({ menuPattern: `${part1}_${part2}` })
      }
      const menuPattern = parts.length > 1 ? part1 : undefined
      return emit({ menuPattern })
    }

    case "prometheus": {
      if (parts.length !== 1) {
        if (composite && typeC) return emit({ menuPattern: `${type} ${typeB.replace("-", " ")}` })

        return emit({ menuPattern: "prometheus" })
      }

      if (composite && typeC) return emit({ menu: `${type} ${typeB.replace("-", " ")}` })

      const familyPart = family.split("_")[0]
      return emit({ menu: `prometheus ${familyPart}` })
    }

    case "tc":
      if (
        context === "tc.qos" &&
        (!("family" in submenuNames) || submenuNames[family] === family)
      ) {
        const [, n] = name.split(".")
        submenuNames[family] = n.replace(/^(in_|out_)/, "").replace(/(_in|_out)$/, "")
      }

      return emit({ menu: part1, priority: id.match(/.*-ifb$/) ? priority - 1 : priority })

    default:
      const menuPattern = parts.length > 1 ? part1 : undefined
      return emit({ menuPattern })
  }
}
